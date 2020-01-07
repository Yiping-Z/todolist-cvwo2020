Rails.application.routes.draw do
  devise_for :users 
  root 'site#home'
  get 'site/index'
  get 'lists', to: 'site#index'
  get 'lists/new', to: 'site#index'
  get 'lists/:id', to: 'site#index'
  get 'lists/:id/edit', to: 'site#index'
  namespace :api do
    resources :lists
  end
end