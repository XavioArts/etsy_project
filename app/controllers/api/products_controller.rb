class Api::ProductsController < ApplicationController

    def index
        render json: Product.all_by_seller
    end

end
