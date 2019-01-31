from neo4j import GraphDatabase
import random
import datetime

uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("neo4j", "cavallorosso"))

# list of users by nanem
users = []
# list of band
bands = []
# list of genre
genres = []
# list of locales
locales = []

# create function accepting a single parameter, the year as a four digit number
def get_random_date(year):
	return "{0}-{1}-{2} {3}:00:00".format(year,random.randint(1,28),random.randint(1,12), random.randint(20,24))

# Initialize users
def read_user(tx):
	[users.append(x) for x in tx.run("MATCH (n:User) RETURN n.name")]

# Initialize bands
def read_band(tx):
	[bands.append(x) for x in tx.run("MATCH (b:Band) RETURN b.name")]

# Initialize genre
def read_genre(tx):
	[genres.append(x) for x in tx.run("MATCH (g:Genre) RETURN g.name")]

# Initialize locale
def read_locale(tx):
	[locales.append(x) for x in tx.run("MATCH (l:Locale) RETURN l.name")]


# Create follower
def create_follower(tx, user, followed):
	tx.run("MATCH (a:User), (b:User) WHERE a.name = {user} AND b.name = {followed} MERGE (a)-[r:FRIEND]->(b) RETURN r",user=user, followed=followed)

# Create frequent
def create_frequented(tx, user, locale):
	tx.run("MATCH (a:User), (b:Locale) WHERE a.name = {user} AND b.name = {locale} MERGE (a)-[r:FREQUENT]->(b) RETURN r",user=user, locale=locale)

# Create like
def create_liked(tx, user, genre):
	tx.run("MATCH (a:User), (b:Genre) WHERE a.name = {user} AND b.name = {genre} MERGE (a)-[r:LIKE]->(b) RETURN r", user=user, genre=genre)

# Create played
def create_played(tx, locale, band):
	tx.run("MATCH (a:Locale), (b:Band) WHERE a.name = {locale} AND b.name = {band} MERGE (a)-[r:PLAYED]->(b)  SET r.date={date} RETURN r", locale=locale, band=band, date=get_random_date(2018))


if __name__ == "__main__":
	
	with driver.session() as session:
		session.read_transaction(read_user)
		session.read_transaction(read_genre)
		session.read_transaction(read_band)
		session.read_transaction(read_locale)

		for index, user in enumerate(users):
			followed = users[index+1::index + 1]
			frequented = locales[index+1::index + 1]
			linked = genres[index+1::index + 1]
			played = bands[index+1::index + 1]

			[session.write_transaction(create_follower, user[0], x[0])  if len(followed) != 0 else print(x) for x in followed]			
			[session.write_transaction(create_frequented, user[0], locale[0]) if len(frequented) != 0 else print(locale) for locale in frequented]
			[session.write_transaction(create_liked, user[0], genre[0]) if len(linked) != 0 else print(genre)for genre in linked]
		for index, locale in enumerate(locales):
			[session.write_transaction(create_played, locale[0], band[0]) if len(played) != 0 else print(band) for band in played]
		


	
		
			

