<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Job;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_jobs_index_requires_authentication()
    {
        $response = $this->getJson('/api/jobs');
        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_get_jobs()
    {
        $user = User::factory()->create();
        Job::factory()->count(3)->create(['employer_id' => $user->id]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/jobs');
        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }
}
