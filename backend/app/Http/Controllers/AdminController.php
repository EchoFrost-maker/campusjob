<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Job;
use App\Models\Application;
use App\Models\Payment;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalStudents = User::where('role', 'student')->count();
        $totalEmployers = User::where('role', 'employer')->count();
        $totalJobs = Job::count();
        $totalApplications = Application::count();
        $totalRevenue = Payment::sum('amount');

        return response()->json([
            'total_students' => $totalStudents,
            'total_employers' => $totalEmployers,
            'total_jobs' => $totalJobs,
            'total_applications' => $totalApplications,
            'total_revenue' => $totalRevenue,
        ]);
    }
}
