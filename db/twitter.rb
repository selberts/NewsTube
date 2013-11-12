require 'twitter'
require 'json'

Twitter.configure do |config|
  config.consumer_key = 'tJO12Hz2jQGHYEZZNWuEg'
  config.consumer_secret = 'u6izuQhp6e27MYAF8HeNMttZIClDlynD15nEUwrHSE'
  config.oauth_token = '868988989-SM0X85NmAzJPhVPLKUEj9SS2Ab3mBIbW7qLFpQIE'
  config.oauth_token_secret = 'rVRqjYtBSLWEtX1aZrqa9P21CAMk92GfUsCC1wL8PY7Ht'
end

searcharr = Twitter.search("obama healthcare youtube", :count => 15, :result_type => "recent").results.map do |status|
  "#{status.full_text}"
end


arr = Array.new(searcharr.length-1)
for $i in 0..searcharr.length-1
	array= searcharr[$i].split(" ")
	link=array.grep(/http/)
	arr[$i]=link
end

final = Array.new
$k =0 
for $i in 0..arr.length-1
	for $j in 0..1
		if arr[$i][$j] ==nil
			next
		end 
		if arr[$i][$j].start_with?('http') == true
			final[$k] = arr[$i][$j]
			$k += 1
		end 
	end
end

final

