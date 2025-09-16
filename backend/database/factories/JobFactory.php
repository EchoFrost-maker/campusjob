<?php

namespace Database\Factories;

use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition()
    {
        return [
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->paragraph,
            'type' => $this->faker->randomElement(['Full-time', 'Part-time', 'Internship']),
            'salary' => $this->faker->numberBetween(10000, 50000),
            'location' => $this->faker->city,
            'company' => $this->faker->company,
            'company_logo' => $this->faker->imageUrl(100, 100, 'business'),
            'industry' => $this->faker->industry,
            'vacancy' => $this->faker->numberBetween(1, 10),
            'experience' => $this->faker->randomElement(['Not required', '1-2 years', '3-5 years']),
            'gender' => $this->faker->randomElement(['Any', 'Male', 'Female']),
            'application_deadline' => $this->faker->date(),
            'context' => $this->faker->paragraph,
            'responsibilities' => $this->faker->paragraphs(3, true),
            'education_requirements' => $this->faker->paragraphs(2, true),
            'additional_requirements' => $this->faker->paragraphs(2, true),
            'benefits' => $this->faker->paragraphs(2, true),
            'employer_id' => \App\Models\User::factory(),
        ];
    }
}
