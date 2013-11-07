class PagesController < ApplicationController
  
  def home
  	@prominentIds = Channel.where(:category => 'prominent').pluck(:channelid)
	@localIds = Channel.where(:category => 'local').pluck(:channelid)
	@advocacyIds = Channel.where(:category => 'advocacy').pluck(:channelid)
  end
end