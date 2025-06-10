with open("All CSL Properties with Global Ids and GDS Ids (Active)_Jun25_1.csv", 'r', encoding='utf-16') as file:
    
    columns = file.readline().replace(" ", "").replace("\n", "").split('\t')

# GlobalPropertyID
# SourcePropertyID
# GlobalPropertyName
# GlobalChainCode
# PropertyAddress1
# PropertyAddress2
# PrimaryAirportCode
# PropertyCityName
# PropertyState/Province
# PropertyZip/Postal
# PropertyCountryCode
# PropertyPhoneNumber
# PropertyFaxNumber
# SabrePropertyRating
# PropertyLatitude
# PropertyLongitude
# SourceGroupCode

    columns_index = {}
    for i, column in enumerate(columns):
        columns_index[column] = i

    # cities_number = 0
    # regions_number = 0

    # cities_index = {}
    # regions_index = {}

    # insert_cities_sql = """
    # INSERT INTO cities (CityID, CityName, Country)
    # VALUES """

    # insert_regions_sql = """
    # INSERT INTO regions (PropertyStateProvinceID, PropertyStateProvinceName)
    # VALUES """

    # insert_hotels_sql = """
    # INSERT INTO hotels (
    #     GlobalPropertyID, SourcePropertyID, GlobalPropertyName, GlobalChainCode,
    #     PropertyAddress1, PropertyAddress2, PrimaryAirportCode, CityID,
    #     PropertyStateProvinceID, PropertyZipPostal, PropertyPhoneNumber,
    #     PropertyFaxNumber, SabrePropertyRating, PropertyLatitude,
    #     PropertyLongitude, SourceGroupCode
    # ) VALUES """

    maxChar_SourcePropertyID = 50
    maxChar_GlobalPropertyName = 100
    maxChar_GlobalChainCode = 10
    maxChar_PrimaryAirportCode = 10
    maxChar_PropertyCityName = 100
    maxChar_PropertyStateProvince = 100
    maxChar_PropertyZipPostal = 20
    maxChar_PropertyCountryCode = 3
    maxChar_PropertyPhoneNumber = 20
    maxChar_PropertyFaxNumber = 20
    maxChar_SourceGroupCode = 10


    for line in file:
        values = line.replace("\n", "").split('\t')
        
        if (len(values) != len(columns)):
            continue

        # if (values[columns_index["PropertyCityName"]] not in cities_index):
        #     cities_index[values[columns_index["PropertyCityName"]]] = cities_number
        #     insert_cities_sql += f"({cities_number}, '{values[columns_index['PropertyCityName']]}', '{values[columns_index['PropertyCountryCode']]}'), "
        #     cities_number += 1

        # if (values[columns_index["PropertyState/Province"]] not in regions_index):
        #     regions_index[values[columns_index["PropertyState/Province"]]] = regions_number
        #     insert_regions_sql += f"({regions_number}, '{values[columns_index['PropertyState/Province']]}'), "
        #     regions_number += 1

        # insert_hotels_sql += f"({values[columns_index['GlobalPropertyID']]}, '{values[columns_index['SourcePropertyID']]}', '{values[columns_index['GlobalPropertyName']]}', '{values[columns_index['GlobalChainCode']]}', '{values[columns_index['PropertyAddress1']]}', '{values[columns_index['PropertyAddress2']]}', '{values[columns_index['PrimaryAirportCode']]}', {cities_index[values[columns_index['PropertyCityName']]]}, {regions_index[values[columns_index['PropertyState/Province']]]}, '{values[columns_index['PropertyZip/Postal']]}', '{values[columns_index['PropertyPhoneNumber']]}', '{values[columns_index['PropertyFaxNumber']]}', {values[columns_index['SabrePropertyRating']]}, {values[columns_index['PropertyLatitude']]}, {values[columns_index['PropertyLongitude']]}, '{values[columns_index['SourceGroupCode']]}'), "

        if values[columns_index["SourcePropertyID"]].__len__() > 50:
            maxChar_SourcePropertyID = max(maxChar_SourcePropertyID, values[columns_index["SourcePropertyID"]].__len__())
        if values[columns_index["GlobalPropertyName"]].__len__() > 100:
            maxChar_GlobalPropertyName = max(maxChar_GlobalPropertyName, values[columns_index["GlobalPropertyName"]].__len__())
            # print(values[columns_index['GlobalPropertyName']])
        if values[columns_index["GlobalChainCode"]].__len__() > 10:
            maxChar_GlobalChainCode = max(maxChar_GlobalChainCode, values[columns_index["GlobalChainCode"]].__len__())
        if values[columns_index["PrimaryAirportCode"]].__len__() > 10:
            maxChar_PrimaryAirportCode = max(maxChar_PrimaryAirportCode, values[columns_index["PrimaryAirportCode"]].__len__())
        if values[columns_index["PropertyCityName"]].__len__() > 100:
            maxChar_PropertyCityName = max(maxChar_PropertyCityName, values[columns_index["PropertyCityName"]].__len__())
        if values[columns_index["PropertyState/Province"]].__len__() > 100:
            maxChar_PropertyStateProvince = max(maxChar_PropertyStateProvince, values[columns_index["PropertyState/Province"]].__len__())
        if values[columns_index["PropertyZip/Postal"]].__len__() > 20:
            maxChar_PropertyZipPostal = max(maxChar_PropertyZipPostal, values[columns_index["PropertyZip/Postal"]].__len__())
        if values[columns_index["PropertyCountryCode"]].__len__() > 3:
            maxChar_PropertyCountryCode = max(maxChar_PropertyCountryCode, values[columns_index["PropertyCountryCode"]].__len__())
        if values[columns_index["PropertyPhoneNumber"]].__len__() > 20:
            maxChar_PropertyPhoneNumber = max(maxChar_PropertyPhoneNumber, values[columns_index["PropertyPhoneNumber"]].__len__())
        if values[columns_index["PropertyFaxNumber"]].__len__() > 20:
            maxChar_PropertyFaxNumber = max(maxChar_PropertyFaxNumber, values[columns_index["PropertyFaxNumber"]].__len__())
            print(values[columns_index['PropertyFaxNumber']])
        if values[columns_index["SourceGroupCode"]].__len__() > 10:
            maxChar_SourceGroupCode = max(maxChar_SourceGroupCode, values[columns_index["SourceGroupCode"]].__len__())
    

    print("Max character lengths:")
    print(f"SourcePropertyID: {maxChar_SourcePropertyID}")
    print(f"GlobalPropertyName: {maxChar_GlobalPropertyName}")
    print(f"GlobalChainCode: {maxChar_GlobalChainCode}")
    print(f"PrimaryAirportCode: {maxChar_PrimaryAirportCode}")
    print(f"PropertyCityName: {maxChar_PropertyCityName}")
    print(f"PropertyStateProvince: {maxChar_PropertyStateProvince}")
    print(f"PropertyZipPostal: {maxChar_PropertyZipPostal}")
    print(f"PropertyCountryCode: {maxChar_PropertyCountryCode}")
    print(f"PropertyPhoneNumber: {maxChar_PropertyPhoneNumber}")
    print(f"PropertyFaxNumber: {maxChar_PropertyFaxNumber}")
    print(f"SourceGroupCode: {maxChar_SourceGroupCode}")
