class HomeController < ApplicationController
    def trash_em
        @trash_em = List.where(:completed => true, :user => current_user).destroy_all
        redirect_to lists_url, notice: 'All Marked Items Were Successfully Deleted.'
    end

    def trash_em_all
        @trash_em_all = List.where(:user => current_user).destroy_all
        redirect_to lists_url, notice: 'All Items Were Successfully Deleted.'
    end
end