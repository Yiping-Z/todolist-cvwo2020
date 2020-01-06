class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.timestamps
    end
 
    create_table :lists do |t|
      t.belongs_to :user
      t.string :title
      t.text :description
      t.date :date
      t.string :tags
      t.boolean :completed, default: false
    end
  end
end
