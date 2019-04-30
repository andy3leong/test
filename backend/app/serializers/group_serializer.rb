class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :meetups, serializer: MeetupSerializer
end
