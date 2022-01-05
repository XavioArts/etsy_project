# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# u1 = User.create(email: "zwarriors@test.com", password: 123456);

# p u1
Buyer.destroy_all
Product.destroy_all
Seller.destroy_all

nums = [ 1, 2, 3, 4 ]
categories = [ "Crafts", "Games", "Jewelry", "Clothing", "Home & Living"]

5.times do 
    seller = Seller.create(email: Faker::Internet.email, name: Faker::Name.name)
    5.times do
        seller.products.create(price: Faker::Commerce.price(range: 10.0..120.0), description: Faker::Commerce.product_name, category: categories.sample)
    end
    nums.sample.times do 
        num_cats = rand(0..categories.length - 1)
        seller.buyers.create(name: Faker::Name.name, max_price: Faker::Commerce.price(range: 50.0..95.5), desired_cat: categories.sample(num_cats))
    end
    p "-----created------"
    p seller
    p "products: #{seller.products.length}, buyers: #{seller.buyers.length}"
    p "------------------"
end

p "seeded #{Seller.all.length} sellers"
p "seeded #{Buyer.all.length} buyers"
p "seeded #{Product.all.length} products"