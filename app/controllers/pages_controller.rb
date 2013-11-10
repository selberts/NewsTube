class PagesController < ApplicationController
  
  def home
    @prominentIds = Channel.where(:category => 'prominent').pluck(:channelid)
    @advocacyIds = Channel.where(:category => 'advocacy').pluck(:channelid)
  end

  def localchannels
    zipcode =  params[:zipcode]

    @localIds = []

    if (zipcode != nil && zipcode != '')

      zip1 = Zipcode.where(:code => zipcode)
      if zip1.present?

        latLong1 = [zip1[0].lat.to_f, zip1[0].long.to_f]

        Channel.where(:category => 'local').each do |channel|
          zip2 = Zipcode.where(:code => channel.zipcode)
          if zip2.present?
            latLong2 = [zip2[0].lat.to_f, zip2[0].long.to_f]

            distance = Zipcode.distance(latLong1, latLong2)

            if (distance < 160)  #this is in kilometers
              @localIds << channel.channelid
            end
          end
        end
      end
    end
  end
end