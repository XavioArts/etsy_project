class Product < ApplicationRecord
  belongs_to :seller

  # SELECT s.id, s.name, s.email, p.id AS product_id,  p.price, p.description, p.category
  # FROM products AS p
  # JOIN sellers AS s 
  # ON p.seller_id = s.id 
  # ORDER BY s.id

  def self.all_by_seller
    select('s.id, s.name, s.email, products.id AS product_id,  products.price, products.description, products.category')
    .joins('JOIN sellers AS s 
    ON products.seller_id = s.id ')
    .order('s.id')
  end

  def self.all_by_category
    select('products.id, seller_id, price, description, category, s.name, s.email')
    .joins('JOIN sellers AS s
    ON s.id = products.seller_id')
    .order('category')
  end

end
