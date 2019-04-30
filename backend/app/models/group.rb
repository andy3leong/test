class Group < ApplicationRecord
  has_many :meetups, dependent: :destroy
  has_many :users, through: :meetups, dependent: :destroy

  validates :name, uniqueness: true
end
