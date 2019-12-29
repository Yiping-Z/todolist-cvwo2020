json.extract! list, :id, :description, :completed, :user_id, :created_at, :updated_at
json.url list_url(list, format: :json)
