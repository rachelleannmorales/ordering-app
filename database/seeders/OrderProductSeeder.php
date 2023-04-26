<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Get all orders and products
        $orders = Order::all();
        $products = Product::all();

        // Loop through each order and product
        foreach ($orders as $order) {
            foreach ($products as $product) {
                // Add a random quantity of each product to the order
                $quantity = rand(1, 5);
                $order->products()->attach($product, ['quantity' => $quantity, 'price' => $quantity*$product->price]);
            }
        }
    }
}
