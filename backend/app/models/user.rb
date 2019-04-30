class User < ApplicationRecord
  has_many :meetups
  has_many :groups, through: :meetups

  validates :first_name, uniqueness: { scope: :last_name }

  def name
    "#{first_name} #{last_name}"
  end
end
