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

end
