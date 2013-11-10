class PagesController < ApplicationController
  
  def home
  	@prominentIds = Channel.where(:category => 'prominent').pluck(:channelid)
	@advocacyIds = Channel.where(:category => 'advocacy').pluck(:channelid)
  end

  def localchannels
  	zipcode =  params[:zipcode]

    if (zipcode == nil || zipcode == '')
    	zipcode = request.location
    end

  	@localIds = []

  	if (zipcode != nil)
	  	Channel.where(:category => 'local').each do |channel|
	  		distance = Geocoder::Calculations.distance_between(channel.zipcode, zipcode)

	  		if (distance < 100)
		  		@localIds << channel.channelid
		  	end
	  	end
	end
  end
end