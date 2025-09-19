<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    // List all jobs
    public function index()
    {
        $jobs = Job::all();
        return response()->json($jobs);
    }

    // Show a single job
    public function show($id)
    {
        $job = Job::find($id);
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }
        return response()->json($job);
    }

    // Create a new job
    public function store(Request $request)
    {
        if ($request->user()->role !== 'employer') {
            return response()->json(['error' => 'Forbidden: Only employers can post jobs'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'salary' => 'required|numeric',
            'type' => 'required|in:Part-time,Permanent,Internship',
            'description' => 'nullable|string',
        ]);

        try {
            $job = Job::create([
                'title' => $request->title,
                'company' => $request->company,
                'location' => $request->location,
                'salary' => $request->salary,
                'type' => $request->type,
                'description' => $request->description,
                'employer_id' => $request->user()->id,
            ]);

            return response()->json($job, 201);
        } catch (\Exception $e) {
            \Log::error('Job creation failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create job', 'details' => $e->getMessage()], 500);
        }
    }

    // Update a job
    public function update(Request $request, $id)
    {
        $job = Job::find($id);
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $this->authorize('update', $job);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'company' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'salary' => 'sometimes|required|numeric',
            'type' => 'sometimes|required|in:Part-time,Permanent,Internship',
            'description' => 'nullable|string',
        ]);

        $job->update($request->all());

        return response()->json($job);
    }

    // Delete a job
    public function destroy($id)
    {
        $job = Job::find($id);
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $this->authorize('delete', $job);

        $job->delete();

        return response()->json(['message' => 'Job deleted']);
    }
}
