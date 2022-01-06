class Api::SellersController < ApplicationController

    def find_products
        render json: Seller.products_by_buyers
    end

end
