class RegistrationsController < Devise::RegistrationsController 
    def token
      #@user = User.where(:id => params[:user_id]).first
      #@user.reset_authentication_token!
      redirect_to edit_user_registration_path(@user)
    end
    protected

    def update_resource(resource, params)
      resource.update_without_password(params)
    end
  end