<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $regularRole = Role::firstOrCreate(['name' => 'regular']);

        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $adminUser->assignRole($adminRole);

        $regularUser1 = User::create([
            'name' => 'Regular User 1',
            'email' => 'regular1@example.com',
            'password' => Hash::make('password'),
        ]);
        $regularUser1->assignRole($regularRole);

        $regularUser2 = User::create([
            'name' => 'Regular User 2',
            'email' => 'regular2@example.com',
            'password' => Hash::make('password'),
        ]);
        $regularUser2->assignRole($regularRole);
    }
}
