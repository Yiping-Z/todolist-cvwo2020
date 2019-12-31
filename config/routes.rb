Rails.application.routes.draw do
  resources :lists
  root to: 'lists#index'
  devise_scope :user do
    get '/login' => 'devise/sessions#new'
    get '/logout' => 'devise/sessions#destroy'
  end
  devise_for :users, controllers: { registrations: 'registrations' }

  resources :users, :controller => "users"
  get 'dashboard/index'
  get 'home/trash_em'
  get 'home/trash_em_all'
  get 'tags/:tag', to: 'lists#index', as: :tag
  
end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

