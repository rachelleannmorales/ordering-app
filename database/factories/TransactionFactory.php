<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'transaction_id' => uniqid(),
            'order_id' => 1,
            'amount' => $this->faker->randomFloat(2, 10, 100),
            'payment_method' => $this->faker->randomElement(['credit_card', 'debit_card', 'paypal']),
            'status' => $this->faker->randomElement(['completed', 'pending', 'failed']),
            'description' => $this->faker->paragraph(),
        ];
    }
}
