Rails.application.routes.draw do
  root 'site#index'
  get 'lists', to: 'site#index'
  get 'lists/new', to: 'site#index'
  get 'lists/:id', to: 'site#index'
  get 'lists/:id/edit', to: 'site#index'
  get 'lists/login'
  get 'lists/signup'
  namespace :api do
    resources :lists, only: %i[index show create destroy update]
  end

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  resources :users, only: [:create, :show, :index]
end