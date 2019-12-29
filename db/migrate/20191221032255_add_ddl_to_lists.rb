class AddDdlToLists < ActiveRecord::Migration[6.0]
  def change
    add_column :lists, :ddl, :datetime
  end
end
