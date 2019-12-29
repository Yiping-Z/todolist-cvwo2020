Rails.application.routes.draw do
  resources :lists
  root to: 'lists#index'
  devise_for :users
  get 'home/trash_em'
  get 'home/trash_em_all'
  get 'tags/:tag', to: 'lists#index', as: :tag
  resource :user, only: [:edit] do
    collection do
      patch 'update_password'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
