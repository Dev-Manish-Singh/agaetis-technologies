<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Employee::insert([
            ['name' => 'Maya Patel', 'email' => 'maya@people.co', 'role' => 'Product Designer', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Noah Williams', 'email' => 'noah@people.co', 'role' => 'Frontend Developer', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Olivia Chen', 'email' => 'olivia@people.co', 'role' => 'Product Manager', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Liam Johnson', 'email' => 'liam@people.co', 'role' => 'Backend Developer', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Ava Thompson', 'email' => 'ava@people.co', 'role' => 'UX Researcher', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
