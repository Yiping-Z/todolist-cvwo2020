class ChangeDdlToBeDateInLists < ActiveRecord::Migration[6.0]
  def change
    change_column :lists, :ddl, :date
  end
end