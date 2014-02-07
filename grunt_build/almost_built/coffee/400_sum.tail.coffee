root = window

class Sum extends root.BaseFilter
	$_name: 'Sum'

	filter: ( list, field ) ->
		sum = 0

		if angular.isArray list
			if field?
				sum += value[ field ] for value in list
			else
				sum += value for value in list
		else if angular.isObject list
			if field?
				sum += value[ field ] for value of list
			else
				sum += value for value of list
		
		sum

root.addFilter Sum