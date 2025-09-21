<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EmployerProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\UserController;

Route::prefix('users')->group(function () {
    // Registration
    Route::post('/register', function (Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:student,employer,admin',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    });

    // Login
    Route::post('/login', function (Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    });

    // Forgot Password
    Route::post('/forgot-password', [UserController::class, 'forgotPassword']);

    // Reset Password
    Route::post('/reset-password', [UserController::class, 'resetPassword']);

// Get Authenticated User Profile
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'showProfile']);

// Update Authenticated User Profile
Route::middleware('auth:sanctum')->put('/me', [UserController::class, 'updateProfile']);

// Employer Profile Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('employer-profile', [EmployerProfileController::class, 'showProfile']);
    Route::put('employer-profile', [EmployerProfileController::class, 'updateProfile']);
});

    // Logout
    Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    });
});

// Job Routes
Route::get('jobs', [JobController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('jobs', [JobController::class, 'store']);
    Route::get('jobs/{id}', [JobController::class, 'show']);
    Route::put('jobs/{id}', [JobController::class, 'update']);
    Route::delete('jobs/{id}', [JobController::class, 'destroy']);
    Route::get('employer/stats', [JobController::class, 'getEmployerStats']);
    Route::apiResource('applications', ApplicationController::class);

    // Additional application routes for employers
    Route::get('applications/job/{jobId}', [ApplicationController::class, 'getApplicationsForJob']);
    Route::put('applications/{id}/status', [ApplicationController::class, 'updateStatus']);
    Route::get('applications/stats/overview', [ApplicationController::class, 'getApplicationStats']);
    Route::apiResource('payments', PaymentController::class);

    // Admin Routes - Protected by admin role middleware
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\AdminController::class, 'dashboard']);
        Route::get('users', [\App\Http\Controllers\AdminController::class, 'getUsers']);
        Route::put('users/{id}/block', [\App\Http\Controllers\AdminController::class, 'blockUser']);
        Route::delete('users/{id}', [\App\Http\Controllers\AdminController::class, 'deleteUser']);
        Route::get('jobs', [\App\Http\Controllers\AdminController::class, 'getJobs']);
        Route::delete('jobs/{id}', [\App\Http\Controllers\AdminController::class, 'deleteJob']);
        Route::get('statistics', [\App\Http\Controllers\AdminController::class, 'getStatistics']);
        Route::get('employers-with-jobs', [\App\Http\Controllers\AdminController::class, 'getEmployersWithJobs']);
        Route::get('active-employers', [\App\Http\Controllers\AdminController::class, 'getActiveEmployers']);

        // Recent activity routes
        Route::get('recent-users', [\App\Http\Controllers\AdminController::class, 'getRecentUsers']);
        Route::get('recent-jobs', [\App\Http\Controllers\AdminController::class, 'getRecentJobs']);
        Route::get('recent-applications', [\App\Http\Controllers\AdminController::class, 'getRecentApplications']);

        // Contact management routes
        Route::get('contacts', [ContactController::class, 'index']);
        Route::get('contacts/{id}', [ContactController::class, 'show']);
        Route::delete('contacts/{id}', [ContactController::class, 'destroy']);
    });
});

// Contact form route
Route::post('contact', [ContactController::class, 'store']);
