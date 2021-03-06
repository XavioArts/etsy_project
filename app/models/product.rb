class Product < ApplicationRecord
  belongs_to :seller

  # SELECT s.id, s.name, s.email, p.id AS product_id,  p.price, p.description, p.category
  # FROM products AS p
  # JOIN sellers AS s 
  # ON p.seller_id = s.id 
  # ORDER BY s.id

  def self.all_by_seller
    select('s.id, s.name, s.email, products.seller_id, products.id AS product_id,  products.price, products.description, products.category')
    .joins('JOIN sellers AS s 
    ON products.seller_id = s.id ')
    .order('s.id')
  end

  ## || ---------------------------------------------------------------------- ||
  ## vv this way sends alot of data to filter on the front end (not very good) vv 

  def self.all_by_category
    select('products.id, seller_id, price, description, category, s.name, s.email')
    .joins('JOIN sellers AS s
    ON s.id = products.seller_id')
    .order('category')
  end

  ## could do this for categories and then do a sql call for the specific category.
  ## idk if we need to do it this way
  # SELECT DISTINCT category
  # FROM products;

  ## other way

  def self.get_categories
    select('DISTINCT category')
  end

  def self.by_category(category)
    select('products.id, seller_id, price, description, category, s.name, s.email')
    .joins('JOIN sellers AS s
    ON s.id = products.seller_id')
    .where('products.category = ?', category)
  end

end
