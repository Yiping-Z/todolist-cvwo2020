Rails.application.routes.draw do
  root to: redirect('/lists')

  get 'lists', to: 'site#index'
  get 'lists/new', to: 'site#index'
  get 'lists/:id', to: 'site#index'
  get 'lists/:id/edit', to: 'site#index'

  namespace :api do
    resources :lists, only: %i[index show create destroy update]
  end
end