class Api::ProductsController < ApplicationController

    def index
        render json: Product.all_by_seller
    end

    def categories
        render json: Product.all_by_category
    end

end
