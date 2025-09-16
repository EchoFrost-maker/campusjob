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
        $request->validate([
            'job_id' => 'required|exists:jobs,id',
        ]);

        $application = Application::create([
            'user_id' => Auth::id(),
            'job_id' => $request->job_id,
            'status' => 'applied',
            'applied_at' => now(),
        ]);

        return response()->json($application, 201);
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
