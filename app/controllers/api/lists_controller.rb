class Api::ListsController < ApplicationController
    respond_to :json
  
    def index
      if current_user
        respond_with current_user.lists.order(date: :DESC)
      end
    end
  
    def show
      if current_user
        respond_with List.find(params[:id])
      end
    end
  
    def create
      if current_user
        respond_with :api, List.create(list_params)
      end
    end
  
    def destroy
      respond_with List.destroy(params[:id])
    end
  
    def update
      list = List.find(params['id'])
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
        :completed,
        :user_id
      )
    end
  end