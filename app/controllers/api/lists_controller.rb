class Api::ListsController < ApplicationController
    respond_to :json
  
    def index
      @user = current_user
      respond_with List.order(date: :DESC).where(:user => @user.username)
    end
  
    def show
      respond_with List.find(params[:id])
    end
  
    def create
      @list = List.create(list_params)
      @list.user = @user.username
      @list.save
      respond_with :api, @list
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
        :user
      )
    end
  end