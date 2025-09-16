<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create sample users
        $employer1 = \App\Models\User::firstOrCreate([
            'email' => 'john@example.com',
        ], [
            'name' => 'John Doe',
            'password' => bcrypt('password'),
            'role' => 'employer',
        ]);

        $employer2 = \App\Models\User::firstOrCreate([
            'email' => 'jane@example.com',
        ], [
            'name' => 'Jane Smith',
            'password' => bcrypt('password'),
            'role' => 'employer',
        ]);

        $student1 = \App\Models\User::firstOrCreate([
            'email' => 'alice@example.com',
        ], [
            'name' => 'Alice Johnson',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $student2 = \App\Models\User::firstOrCreate([
            'email' => 'bob@example.com',
        ], [
            'name' => 'Bob Wilson',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        // Create sample jobs
        \App\Models\Job::create([
            'title' => 'Software Engineer Intern',
            'company' => 'Tech Corp',
            'location' => 'Dhaka University',
            'salary' => 15000,
            'type' => 'Internship',
            'description' => 'Develop web applications using React and Laravel.',
            'employer_id' => $employer1->id,
        ]);

        \App\Models\Job::create([
            'title' => 'Marketing Assistant',
            'company' => 'Marketing Inc',
            'location' => 'BUET Campus',
            'salary' => 12000,
            'type' => 'Part-time',
            'description' => 'Assist in marketing campaigns and social media management.',
            'employer_id' => $employer2->id,
        ]);

        \App\Models\Job::create([
            'title' => 'Research Assistant',
            'company' => 'University Research',
            'location' => 'NSU',
            'salary' => 18000,
            'type' => 'Permanent',
            'description' => 'Conduct research and assist professors in academic projects.',
            'employer_id' => $employer1->id,
        ]);

        \App\Models\Job::create([
            'title' => 'Campus Ambassador',
            'company' => 'Event Co',
            'location' => 'DU',
            'salary' => 10000,
            'type' => 'Part-time',
            'description' => 'Promote events and engage with students on campus.',
            'employer_id' => $employer2->id,
        ]);

        // Create sample applications
        \App\Models\Application::create([
            'user_id' => $student1->id,
            'job_id' => 1,
            'status' => 'applied',
        ]);

        \App\Models\Application::create([
            'user_id' => $student2->id,
            'job_id' => 2,
            'status' => 'shortlisted',
        ]);

        // Create sample payments
        \App\Models\Payment::create([
            'user_id' => $student1->id,
            'amount' => 5000,
            'description' => 'Campus Ambassador Payment',
            'status' => 'success',
        ]);

        \App\Models\Payment::create([
            'user_id' => $student2->id,
            'amount' => 3000,
            'description' => 'Internship Stipend',
            'status' => 'pending',
        ]);
    }
}
