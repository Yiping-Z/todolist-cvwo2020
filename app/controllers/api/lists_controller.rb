class Api::ListsController < ApplicationController    
  skip_before_action :verify_authenticity_token
    respond_to :json 
    def index
      if user_signed_in?
        render json: current_user.lists.order(date: :DESC)
      else
        render json: {}, status: 401
      end 
    end
  
    def show
      respond_with List.find(params[:id])
    end
  
    def create
      if user_signed_in?
        respond_with :api, current_user.lists.create(list_params)
      else
        render json: {}, status: 401
      end
    end
  
    def destroy
      respond_with List.destroy(params[:id])
    end
  
    def update
      list =List.find(params['id'])
      list.update(list_params)
      respond_with List, json: list
    end
  
    private
  
    def list_params
      params.require(:list).permit(
        :id,
        :title,
        :description,
        :date,
        :tags,
        :completed
      )
    end
  end