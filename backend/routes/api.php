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
            'role' => 'required|in:student,employer',
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
    Route::apiResource('applications', ApplicationController::class);
    Route::apiResource('payments', PaymentController::class);

    // Admin Dashboard Route
    Route::get('admin/dashboard', [\App\Http\Controllers\AdminController::class, 'dashboard']);
});

// Contact form route
Route::post('contact', [ContactController::class, 'store']);
