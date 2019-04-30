class Meetup < ApplicationRecord
  require 'csv'

  belongs_to :user
  belongs_to :group

  enum role: [:Organizer, :Presenter, :Participant]

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      user = User.find_or_create_by(first_name: row["First Name"], last_name: row["Last Name"])
      group = Group.find_or_create_by(name: row["Group Name"])
      Meetup.create(user: user, group: group, role: row["Role in Group"])
    end
  end
end
