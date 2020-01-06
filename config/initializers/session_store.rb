if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_todolist-react-cvwo', domain: 'https://todolist-react-cvwo.herokuapp.com'
else
    Rails.application.config.session_store :cookie_store, key: '_todolist-react-cvwo' 
end