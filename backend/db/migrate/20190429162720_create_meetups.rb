class CreateMeetups < ActiveRecord::Migration[5.2]
  def change
    create_table :meetups do |t|
      t.belongs_to :user, index: true
      t.belongs_to :group, index: true
      t.integer :role, null: false, default: 0
      t.timestamps
    end
  end
end
