class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :name
      t.integer :id_categories
      t.string :remark

      t.timestamps
    end
  end
end
