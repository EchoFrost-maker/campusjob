<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role === 'employer') {
            // Employer sees all applications for their jobs
            $applications = Application::whereHas('job', function ($query) use ($user) {
                $query->where('employer_id', $user->id);
            })->with(['user', 'job'])->get();
        } else {
            // Student sees their own applications
            $applications = Application::where('user_id', $user->id)->with('job')->get();
        }
        return response()->json($applications);
    }

    public function store(Request $request)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return response()->json([
                'message' => 'You must be logged in to submit an application.',
                'error' => 'Unauthenticated'
            ], 401);
        }

        $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'cover_letter' => 'nullable|string|max:1000',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // 5MB max
        ]);

        try {
            // Check if user already applied for this job
            $existingApplication = Application::where('user_id', Auth::id())
                ->where('job_id', $request->job_id)
                ->first();

            if ($existingApplication) {
                return response()->json([
                    'message' => 'You have already applied for this job.',
                    'error' => 'Duplicate application'
                ], 409);
            }

            $resumePath = null;
            if ($request->hasFile('resume')) {
                $resumePath = $request->file('resume')->store('resumes', 'public');
            }

            $application = Application::create([
                'user_id' => Auth::id(),
                'job_id' => $request->job_id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'cover_letter' => $request->cover_letter,
                'resume_path' => $resumePath,
                'status' => 'applied',
                'applied_at' => now(),
            ]);

            return response()->json([
                'message' => 'Application submitted successfully!',
                'application' => $application
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit application. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $application = Application::with(['user', 'job'])->find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        $this->authorize('view', $application);
        return response()->json($application);
    }

    public function update(Request $request, $id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        $this->authorize('update', $application);

        $request->validate([
            'status' => 'required|in:applied,shortlisted,rejected,accepted',
        ]);

        $application->status = $request->status;
        $application->save();

        return response()->json($application);
    }

    public function destroy($id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        $this->authorize('delete', $application);

        $application->delete();

        return response()->json(['message' => 'Application deleted']);
    }
}
