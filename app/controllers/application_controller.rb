class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    protect_from_forgery
    include AuthorizationHelper
    rescue_from CanCan::AccessDenied do |exception|
      flash[:error] = exception.message
      redirect_to root_url
    end

    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:admin])
        devise_parameter_sanitizer.permit(:sign_in, keys: [:admin]) 
        devise_parameter_sanitizer.permit(:account_update, keys: [:admin])  
    end
   
end