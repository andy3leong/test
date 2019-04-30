class MeetupController < ApplicationController
  def upload
    Meetup.import(params[:file])
    head 204
  end
end
