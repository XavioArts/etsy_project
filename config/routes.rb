Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  namespace :api do
    get "products", to: "products#index"
    get "categories", to: "products#categories"
    get "get_categories", to: "products#get_categories"
    get "get_categories/:category", to: "products#by_category"
    get "find_products", to: "sellers#find_products"
  end

end
