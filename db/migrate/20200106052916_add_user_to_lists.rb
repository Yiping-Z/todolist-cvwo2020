class AddUserToLists < ActiveRecord::Migration[6.0]
  def change
    add_column :lists, :user, :string
  end
end
