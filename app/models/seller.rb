class Seller < ApplicationRecord
    has_many :products
    has_many :buyers

    # SELECT sellers.id, sellers.email, sellers.name, b.id AS buyer_id, b.name AS buyer_name, b.max_price, 
    # b.desired_cat, p.id AS product_id, p.price, p.description, p.category
    # FROM sellers
    # JOIN buyers AS b 
    # ON b.seller_id = sellers.id
    # JOIN products AS p
    # ON p.seller_id = sellers.id
    # WHERE p.price < b.max_price

    def self.products_by_buyers
        select('sellers.id, sellers.email, sellers.name, b.id AS buyer_id, b.name AS buyer_name, b.max_price, 
         b.desired_cat, b.seller_id, p.id AS product_id, p.price, p.description, p.category')
        .joins('JOIN buyers AS b 
        ON b.seller_id = sellers.id 
        JOIN products AS p 
        ON p.seller_id = sellers.id')
        .where('p.price < b.max_price')
        .order('sellers.id')
    end

end
