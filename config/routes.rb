Rails.application.routes.draw do
  root 'site#index'
  get 'lists', to: 'site#index'
  get 'lists/new', to: 'site#index'
  get 'lists/:id', to: 'site#index'
  get 'lists/:id/edit', to: 'site#index'
  get 'lists/login'
  get 'lists/signup'
  get 'lists/logout'
  get 'lists/logged_in'
  namespace :api do
    resources :lists, only: %i[index show create destroy update]
  end
  
  post 'lists/login', to: 'sessions#create'
  delete 'lists/logout', to: 'sessions#destroy'
  get 'lists/logged_in', to: 'sessions#is_logged_in?'

  resources :users, only: [:create, :show, :index]
end